import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { animateScroll as scroll } from 'react-scroll'
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
                    <ul className="slideshow">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <Button
                        className="register-btn"
                        onClick={() => scroll.scrollToBottom({duration: 2500, smooth: 'easeInOutQuad'})}
                        style={{fontSize: "1.2rem"}}
                    >
                        {"Register"}
                    </Button>
                </section>
                <section>
                    <Form className="form" onSubmit={ this.handleSubmit }>
                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"Full Name"}
                            </label>
                            <input
                                placeholder="Enter your name"
                                value={ name }
                                onChange={ (e) => this.handleChange(e, "name") }
                                type="text"
                                required
                                
                            />
                        </Form.Field>

                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"Attending the wedding?"}
                            </label>
                            <select
                                required
                                onChange={ (e) => this.handleChange(e, "attending")}
                            >
                                <option value="yes">{"Yes"}</option>
                                <option value="no">{"No"}</option>
                            </select>
                        </Form.Field>

                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"Number of adults"}
                            </label>
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

                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"Number of children"}</label>
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

                        <Button
                            primary
                            type="submit"
                            style={{fontSize: "1.2rem"}}
                        >
                            {"Submit"}
                        </Button>
                    </Form>
                </section>
            </div>
        )
    }
}

export default AttendanceForm;
