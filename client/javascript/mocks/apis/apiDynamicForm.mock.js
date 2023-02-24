export default {
    "formAPI": "",
    "listRow": [
        {
            "customClass": "",
            "isMutilable": false,
            "listElement": [
                {
                    "customClass" : "",
                    "type": "html",
                    "label": "<h1>Customer and Product</h1>"
                }
            ]
        },
        {
            "listElement": [
                {
                    "customClass": "",
                    "label": "Fist Name",
                    "type": "text",
                    "name": "fistName",
                    "defaultValue": "",
                    "placeholder": "First Name",
                    "mobileWidth": 12,
                    "width": 6,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "First name is required"
                        },
                        {
                            "type": "maxLength",
                            "value": 200,
                            "messageError": "First name is too long"
                        }
                    ]
                },
                {
                    "label": "Last Name",
                    "type": "text",
                    "name": "lastName",
                    "defaultValue": "Lee",
                    "placeholder": "Last Name",
                    "mobileWidth": 12,
                    "width": 6,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Last name is required"
                        },
                        {
                            "type": "maxLength",
                            "value": 200,
                            "messageError": "Last name is too long"
                        }
                    ]
                }
            ]
        },
        {
            "listElement": [
                {
                    "label": "Email",
                    "type": "email",
                    "name": "email",
                    "placeholder": "example@gmail.com",
                    "defaultValue": "nha.le@niteco.se",
                    "mobileWidth": 12,
                    "width": 12,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": [
                                "Email is required"
                            ]
                        },
                        {
                            "type": "emailValidation",
                            "messageError": [
                                "Your email is not correct format"
                            ]
                        }
                    ]
                },
                {
                    "label": "Alternate Email",
                    "type": "email",
                    "name": "alternativeEmail",
                    "placeholder": "example@gmail.com",
                    "defaultValue": "",
                    "isAlternate": true,
                    "mobileWidth": 12,
                    "width": 12,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Email is required"
                        },
                        {
                            "type": "emailValidation",
                            "messageError": "Your email is not correct format"
                        }
                    ]
                }
            ]
        },
        {
            "listElement": [
                {
                    "label": "Mobile Phone",
                    "type": "countryPhone",
                    "name": "phone",
                    "defaultValue": "Bahrain",
                    "options": [
                        {value: "Bahrain", text: "Bahrain"},
                        {value: "VietNam", text: "VietNam"},
                        {value: "Australia", text: "Australia"},
                    ],
                    "mobileWidth": 12,
                    "width": 12,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Phone number is required"
                        }
                    ]
                },
                {
                    "label": "Alternate Mobile Phone",
                    "isAlternate": true,
                    "type": "countryPhone",
                    "name": "alternateCountryPhone",
                    "defaultValue": "Australia",
                    "options": [
                        {value: "Bahrain", text: "Bahrain"},
                        {value: "VietNam", text: "VietNam"},
                        {value: "Australia", text: "Australia"},
                    ],
                    "mobileWidth": 12,
                    "width": 12,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Phone number is required"
                        }
                    ]
                }
            ]
        },
        {
            "customClass": "mgt-sm-30",
            "listElement": [
                {
                    "type": "html",
                    "label": "<strong class='mgt-sm-20'>Consent to receive telemarketing </strong>"
                }
            ]
        },
        {
            "customClass": "mgt-sm-10",
            "listElement": [
                {
                    "type": "html",
                    "label": "<div>I would like to receive marketing information through the following modes of communication to my telephone number.</div>"
                }
            ]
        },
        {
            "listElement": [
                {
                    "type": "checkbox",
                    "name": "follow_whatsapp",
                    "label": "Whatsapp",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
                {
                    "type": "checkbox",
                    "name": "follow_sms",
                    "label": "SMS",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
                {
                    "type": "checkbox",
                    "name": "follow_email",
                    "label": "Email",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
            ]
        },
        {
            "listElement": [
                {
                    "type": "radio",
                    "name": "test_radio",
                    "label": "Whatsapp",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
                {
                    "type": "radio",
                    "name": "test_radio",
                    "label": "SMS",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
                {
                    "type": "radio",
                    "name": "test_radio",
                    "label": "Email",
                    "mobileWidth": 12,
                    "width": 3,
                    "validations": []
                },
            ]
        },
        {
            "customClass": "mgt-sm-10",
            "listElement": [
                {
                    "type": "html",
                    "label": "<h2> Purchase information </h2>"
                }
            ]
        },
        {
            "listElement": [
                {
                    "label": "Category",
                    "type": "select",
                    "name": "category",
                    "mobileWidth": 12,
                    "width": 4,
                    "options": [
                        {
                            "label": "Ovens",
                            "value": "ovens",
                        },
                        {
                            "label": "Cooktops",
                            "value": "Cooktops",
                        },
                        {
                            "label": "Dishwasher",
                            "value": "Dishwasher",
                        },
                        {
                            "label": "Dryer",
                            "value": "Dryer",
                        },
                    ],
                    "validations": [
                        {
                            "type": "required",
                            "messageError": [
                                "Category is required"
                            ]
                        }
                    ]
                },
                {
                    "label": "Serial no(optional)",
                    "type": "number",
                    "name": "serialNo",
                    "mobileWidth": 12,
                    "width": 4,
                    "tooltip": "How to get Serial Number?",
                    "validations": []
                },
                {
                    "label": "Date of purchase",
                    "type": "datetime",
                    "name": "dateOfPurchase",
                    "mobileWidth": 12,
                    "width": 4,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Date of purchase is required"
                        },
                        {
                            "type": "beforeToday",
                            "messageError": "Date of purchase is required"
                        }
                    ]
                },
                {
                    "label": "Date of purchase range",
                    "type": "daterange",
                    "name": "dateOfPurchase",
                    "mobileWidth": 12,
                    "width": 4,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "Date of purchase is required"
                        },
                        {
                            "type": "beforeToday",
                            "messageError": "Date of purchase is required"
                        }
                    ]
                }
            ]
        },
        {
            listElement: [
                {
                    "type": "checkbox",
                    "name": "confirmed",
                    "label": "I confirm that I have read and agreed to the <strong>Privacy Policy</strong> and <strong>Warranty Terms and Conditions</strong>",
                    "mobileWidth": 12,
                    "width": 12,
                    "validations": [
                        {
                            "type": "required",
                            "messageError": "This field is required"
                        }
                    ]
                },
            ]
        }
    ]
};