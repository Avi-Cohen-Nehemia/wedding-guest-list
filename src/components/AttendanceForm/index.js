import React, { Component } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import axios from "axios";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            attending: "yes",
            name: "",
            adults: "0",
            children: "0",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e, input) {
        let value = e.currentTarget.value;

        this.setState({ [input]: value })
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('https://sheet.best/api/sheets/58ada64d-79d4-4596-8b0a-2d6e76fcdaf3', this.state)
        .then(response => {
            console.log(response);
        })
    }

    render() {

        const { attending, name, adults, children } = this.state;
        const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return (
            <div className="container">
                <section>
                </section>
                <section>
                    <Header as="h2">{"Wedding Registration Form"}</Header>
                    <Form className="form" onSubmit={ this.handleSubmit }>
                        <Form.Field>
                            <label>{"Full Name"}</label>
                            <input
                                placeholder="Enter your name"
                                value={ name }
                                onChange={ (e) => this.handleChange(e, "name") }
                                type="text"
                                required
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>{"Attending the wedding?"}</label>
                            <select
                                required
                                onChange={ (e) => this.handleChange(e, "attending")
                            }>
                                <option value="yes">{"Yes"}</option>
                                <option value="no">{"No"}</option>
                            </select>
                        </Form.Field>

                        <Form.Field>
                            <label>{"Number of adults"}</label>
                            <select
                                disabled={ attending === "no" }
                                placeholder="Enter your age"
                                value={ adults }
                                onChange={ (e) => this.handleChange(e, "adults") }
                                required={ attending === "yes" }
                            >
                                { options.map((num, index) => (
                                    <option
                                        value={`${num}`}
                                        key={index}
                                    >
                                        {`${num}`}
                                    </option>
                                ))}
                            </select>
                        </Form.Field>

                        <Form.Field>
                            <label>{"Number of children"}</label>
                            <select
                                disabled={ attending === "no" }
                                placeholder="Enter your age"
                                value={ children }
                                onChange={ (e) => this.handleChange(e, "children") }
                                required={ attending === "yes" }
                            >
                                { options.map((num, index) => (
                                    <option
                                        value={`${num}`}
                                        key={index}
                                    >
                                        {`${num}`}
                                    </option>
                                ))}
                            </select>
                        </Form.Field>

                        <Button primary type="submit">{"Submit"}</Button>
                    </Form>
                </section>
            </div>
        )
    }
}

export default AttendanceForm;
