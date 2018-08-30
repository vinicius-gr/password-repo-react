import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from 'validator/lib/isEmail';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component{
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = (event) => {
        this.setState({
            data: {...this.state.data, [event.target.name]: event.target.value }
        });
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if(!data.password) errors.password = "Please, fill in your password.";
        if(!isEmail(data.email)) errors.email = "Please, check your email and try again."
        return errors;
    }

    render (){
        const {data, errors} = this.state;
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="email@email.com" 
                            value={data.email}
                            onChange={this.onChange}
                        />
                    </div>                    
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field> 
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Senha</label>
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Your password" 
                            value={data.password}
                            onChange={this.onChange}
                        />
                    </div>
                   
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>                        
                <Button primary>Entrar</Button>
                <a style={{float: 'right'}} href="#" class="right aligned">Damn, I forgot my password again!</a>
            </Form>
        );
    }
} 

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;