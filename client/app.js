import axios from 'axios'

const remote_url =
    import.meta.env.VITE_SERVER_URL


export default function Web_Application() {

    return {
        info: [],

        logIn_message: '',
        message: '',
        error: '',
        error_message: '',

        loggeIn: true,
        registration: false,

        signUp: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        },

       
        hideContent: false,
        show: false,
        showHome: true,
        signIn: {
            username: '',
            password: '',
        },
       
        showLand: false,
        showLoginForm: false,


       

        init() {

            if (localStorage['user'] !== undefined) {
                this.loggeIn = false
                this.registration = false
                this.showHome = true;
                this.user = JSON.parse(localStorage.getItem('user'))

            } else {

                this.loggeIn = true
                this.registration = false
                this.showHome = false;
            }


            setInterval(() => {
                this.message = ''
                this.error_message = ''
                this.logIn_message = ''
            }, 5000);
        },

        goToLogin() {
            setInterval(() => {
                this.showForm()
            }, 3000);
        },

        logoutFunc() {
            localStorage.clear()
            this.loggeIn = true
            this.registration = false
            this.showHome = false;
            this.user.role = false
        },

        regUser() {
            axios
                .post(`${remote_url}/api/signUp`, this.signUp)
                .then(results => {
                    this.message = "User created"
                    setInterval(() => { }, 6000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log('User doesnt exists'))

        },

        showContent() {
            this.showLoginForm = !this.showLoginForm
            this.show = false

            this.showLoginForm = true

        },

        showNav() {
            this.showLand = !this.showLand

        },

        showHomeFunc() {

            // this.showLoginForm = true

            this.showHome = !this.showHome

        },

        showForm() {
            this.show = !true
        },

        hideLogin() {
            this.showLoginForm = false
        },

        logUser() {
            axios
                .post(`${remote_url}/api/logIn`, this.signIn)

                .then((qApp) => {
                    var {
                        token,
                        user
                    } = qApp.data;

                    if (!token) {
                        return false
                    }

                    localStorage.setItem('user', JSON.stringify(user));
                    this.token = JSON.stringify(token)
                    localStorage.setItem('token', this.token);
                    this.user = user
                    this.loggeIn = false
                    this.registration = false
                    this.showHome = true;
                    this.logIn_message = "You are logged in"
                    if (user !== user) {
                        this.error_message = "The user doesn't exist"
                    }

                    setTimeout(() => {
                        this.token = ''
                    }, 6000);
                    return true;
                })

                .then(result => {
                    this.first_name = ''
                    this.last_name = ''
                    this.username = ''
                    this.password = ''
                    if (!result) {
                        this.message = 'Incorrect user credentials'
                    }
                })
                
                .catch((err) => {
                    console.log(err)
                })
        },



        displayData() {

            axios
                .get(`${remote_url}/api/device_data`)
                .then(results => {
                    this.computers = results.data.theData;

                    console.log(results.data.theData);
                    setInterval(() => { }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        
        logoutFunc() {
            localStorage.clear()
            this.loggeIn = true
            this.registration = false
            this.showHome = false;
            this.user.role = false
        },

    }

}