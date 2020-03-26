import User from 'models/User';

class ProfileController {
    constructor(props) {
        this.instance = null;
        this.user = props.user;
    }

    static getInstance(props) {
        if (!this.instance) {
            this.instance = new ProfileController(props);
        }
        return this.instance;
    }

    getUser = () => {
        return this.user;
    }
}

export default ProfileController;