export default {
    namespace: 'userModel',
    state: {
        id:'',
        realname:'',
        telephone:'',
        photo:'',
        address:[]
    },
    subscriptions: {},
    effects: {},
    reducers: {
        setRealname(state, action) {
            return { ...state, realname:action.payload };
        },
        setTelephone(state, action){
            return { ...state, telephone:action.payload };
        },
        setPhoto(state, action){
            return { ...state, photo:action.payload };
        },
        setId(state, action){
            return { ...state, photo:action.payload };
        }
    },
}
