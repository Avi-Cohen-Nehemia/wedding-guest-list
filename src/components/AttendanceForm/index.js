import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { animateScroll as scroll } from 'react-scroll'
import Spinner from "./../Spinner";
import Swal from "sweetalert2";
import axios from "axios";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            attending: "yes",
            name: "",
            adults: "0",
            children: "0",
            submitting: false
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

        this.setState({ submitting: true });

        axios.post('https://sheet.best/api/sheets/58ada64d-79d4-4596-8b0a-2d6e76fcdaf3', this.state)
        .then(() => {

            Swal.fire({
                icon: 'success',
                title: 'הטופס נשלח בהצלחה',
                text: 'תודה שאשרתם הגעתכם, אתם יכולים לסגור את הדפדפן',
            });

            this.setState = ({
                attending: "yes",
                name: "",
                adults: "0",
                children: "0",
                submitting: false
            });

        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'אופס...',
                text: 'נסו שוב',
            });

            this.setState({ submitting: false });
        });
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
                        {"לאישור הגעה"}
                    </Button>
                </section>
                <section>
                    { this.state.submitting ? <Spinner /> :
                    <Form className="form" onSubmit={ this.handleSubmit }>
                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"שם מלא"}
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
                                {"באים לחתונה?"}
                            </label>
                            <select
                                required
                                onChange={ (e) => this.handleChange(e, "attending")}
                            >
                                <option value="yes">{"כן"}</option>
                                <option value="no">{"לא"}</option>
                            </select>
                        </Form.Field>

                        <Form.Field style={{ marginBottom: "2rem" }}>
                            <label style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "1.5rem"
                            }}>
                                {"מספר מבוגרים"}
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
                                {"מספר ילדים"}</label>
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
                            {"שלח"}
                        </Button>
                    </Form> }
                </section>
            </div>
        )
    }
}

export default AttendanceForm;
