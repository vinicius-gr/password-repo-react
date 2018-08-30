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
        if(!data.password) errors.password = "Preencha a sua senha.";
        if(!isEmail(data.email)) errors.email = "Email inválido."
        return errors;
    }

    render (){
        const {data, errors} = this.state;
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="email@email.com" 
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field> 
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Sua senha" 
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>                        
                <Button primary>Entrar</Button>
            </Form>
        );
    }
} 

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;