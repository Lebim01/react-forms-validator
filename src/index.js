import React from 'react';
import { forEach, isEqual }  from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment'

let formElements = {};

export default class Validator extends React.Component{

    static propTypes (){
        isFormSubmitted:PropTypes.bool.isRequired;
        reference:PropTypes.object.isRequired;
        validationRules:PropTypes.object.isRequired;
        validationMessages:PropTypes.object.isRequired;
        isValidationError:PropTypes.func.isRequired;
    }

    constructor(props){
        super(props);
        this.state = {
            error:""
        };
        this.formElements = [];
    }
    
    componentWillReceiveProps(nextProps){
        let { isFormSubmitted, reference, validationRules, validationMessages, isValidationError } = nextProps;

        if ( !isEqual( isFormSubmitted, this.props.isFormSubmitted ) || !isEqual( reference, this.props.reference )){
            if( validationRules ){
                
                let flag=[];
                let tempElements = formElements;
                
                let refKey;

                forEach(reference,(val,key)=>{
                    tempElements[key] = { validationRules: validationRules, validationMessages: validationMessages, reference: reference };
                    refKey=key;
                })

                forEach(tempElements,(val,key)=>{
                    let tempflag = true;
                    let tempflag2 = true;
                    let message = "";
                    forEach( val['validationRules'], ( rule, func ) => {
                        
                        if (tempflag){
                            if (isEqual(refKey,key)) {
                                message = val['validationMessages'][func];
                                forEach(val['reference'], (val, key) => {
                                    if (this[func](rule, val)) {
                                        this.setState({ error: message });
                                        tempflag = false;
                                    }else{
                                        this.setState({ error: "" });
                                        tempflag = true;
                                    }
                                })
                            }else{
                                forEach(val['reference'], (val, key) => {
                                    if (this[func](rule, val)) {
                                        tempflag = false;
                                    }
                                })
                            }
                        }
                    });
                    flag.push(tempflag);
                });

                formElements = tempElements;
                if(flag.includes(false)){
                    if(isValidationError){
                        isValidationError(true);
                    }
                }
                else{
                    if(isValidationError){
                        isValidationError(false);
                    }
                }
            }
        }
    }
    required( rule, value ){
        if (rule === true){
            return value ? value.toString().trim().length === 0 : true;
        }
        return false
    }
    minLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length < rule;
        }
        return false;
    }
    maxLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length > rule;
        }
        return false;
    }
    email( rule, value){
        if (rule === true){
            if(value)
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            else 
                return false;
        }
        return false;
    }
    url( rule, value ){
        if ( rule === true ){
            return !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
        }
        return false;
    }
    number( rule, value ){
        if (rule === true){
            return !/^[-+]?\d+$/gm.test(value);
        }
        return false;
    }
    date( rule, value ){
        if (rule === true){
            return !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](18|19|20|21)\d\d$/gm.test(value);
        }
        return false;
    }
    color(rule,value){
        if (rule === true){
            return !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
        }
        return false;
    }
    ip(rule, value){
        if(rule === true){
            return !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)
        }
        return false
    }
    phone(rule, value){
        if(rule === true){
            // (dd) ddd-dddd
            const format1 = /(\(\d\d\)+\s+\d\d\d+\s\-+\s+\d\d\d\d)/
            // ddd ddd ddd
            const format2 = /(\d\d\d+\s+\d\d\d+\s+\d\d\d)/
            return !(format1.test(value) || format2.test(value))
        }
        return false
    }
    minRangeNumber(rule, value){
        if (parseFloat(rule)){
            return parseFloat(value) < rule;
        }
        return false;
    }
    maxRangeNumber(rule, value){
        if (parseFloat(rule)){
            return parseFloat(value) > rule;
        }
        return false;
    }
    minRangeDate(rule, value){
        let _rule = moment(rule)
        let _value = moment(value)
        if (_rule.isValid() && _value.isValid()){
            return _value.isBefore(_rule)
        }
        return false;
    }
    maxRangeDate(rule, value){
        let _rule = moment(rule)
        let _value = moment(value)
        if (_rule.isValid() && _value.isValid()){
            return _value.isAfter(_rule)
        }
        return false;
    }

    equalTo( rule, value ){
    
        if(rule === value){
            return false;
        }
        return true;
    }
    
    render(){
        let { error } = this.state;
        return (
            <span className="error" style={{color:'red',fontSize:`12'px'`}}>
                {error}
            </span>
        );
    }

} 
