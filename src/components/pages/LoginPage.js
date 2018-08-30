import React from 'react';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Container } from "semantic-ui-react";

class LoginPage extends React.Component {

    submit = (data) => {
        this.props.login(data).then(() => this.props.history.push("/home"));
    }

    render() {
        return (
            <div style={{ display: 'grid', alignItems: 'center', height: '100vh' }}>
                <div className="ui raised very padded text container segment">
                    <div class="ui top attached tabular menu">
                        <a class="item active" data-tab="login">Login</a>
                        <a class="item" data-tab="signin">Sign In</a>
                    </div>
                    <div className="ui bottom attached tab segment active" data-tab="login">
                        <LoginForm submit={this.submit} />
                    </div>
                    <div className="ui bottom attached tab segment"  data-tab="signin">
                        <LoginForm submit={this.submit} />
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);