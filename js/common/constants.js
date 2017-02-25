(function(angular){
    'use strict';

    angular.module('storiesApp')
        .constant('APP_CONSTANTS',{
            WELCOME_PAGE:{
                WELCOME_LINE1:'Welcome to Stories for Kids.',
                WELCOME_LINE2:'Here you can find a large collection of children stories. A reference site for students, parents and teachers.'
            },
            MAIN_HEADER:{
                TITLE_PART1:'Stories for ',
                TITLE_PART2:'Kids',
                TAGLINE:'Moral, Motivational & Inspirational Stories',
                LOGIN:{
                    LABEL:'Login / Sing Up',
                    ALT_TEXT:''
                },
                LOGOUT:{
                    LABEL:'Logout',
                    ALT_TEXT:''
                },
                SEARCH:{
                    LABEL:'Search a Story',
                    ALT_TEXT:'',
                    TYPE_SOMETHING:'Type something to see results'
                }
            },
            MAIN_FOOTER:{
                BORING_LINKS:{
                    PRIVACY_POLICY:{
                        LABEL:'Privacy Policy',
                        ALT_TEXT:'',
                        STATE_NAME:'boring-stuff.privacy'
                    },
                    TERMS_OF_USE:{
                        LABEL:'Terms of Use',
                        ALT_TEXT:'',
                        STATE_NAME:'boring-stuff.terms-of-use'
                    },
                    DISCLAIMER:{
                        LABEL:'Disclaimer',
                        ALT_TEXT:'',
                        STATE_NAME:'boring-stuff.disclaimer'
                    },
                    SITE_MAP:{
                        LABEL:'Site Map',
                        ALT_TEXT:'',
                        STATE_NAME:'boring-stuff.site-map'
                    }
                },
                CONTACT_US:{
                    LABEL:'Contact Us',
                    ALT_TEXT:'',
                    STATE_NAME:'contact-us',

                },
                LICENSE:{
                    LINK:'http://creativecommons.org/licenses/by-sa/4.0/',
                    ALT_TEXT:'Creative Commons License',
                    NON_LINK_TEXT:'This work is licensed under a ',
                    LINK_TEXT:'Creative Commons Attribution-ShareAlike 4.0 International License'
                }
            },
            READER:{
                NIGHT_MODE:{
                    LABEL:'',
                    ALT_TEXT:''
                },
                GO_BACK:{
                    LABEL:'',
                    ALT_TEXT:'',
                    LINK:''
                }
            },
            SIGNIN:{
                LOGIN_LABEL:'',
                ERR_MSGS:{
                    EMAIL_REQ:'',
                    EMAIL_INVALID:'',
                    PWD_REQ:'',
                    PWD_INVALID:''
                }
            },
            SIGNUP:{

            }
        });
}(angular));

