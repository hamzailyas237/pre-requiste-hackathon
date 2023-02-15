import { StyleSheet } from "react-native";


export const FormStyles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        minHeight: 650
    },

    appHeadingContainer: {
        backgroundColor: '#499BFD',
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },

    appHeading: {
        color: 'white',
        fontSize: 20
    },

    containerShadow: {
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        top: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },

    mainHeading: {
        fontSize: 30,
        marginBottom: 20,
        color: '#499BFD',
    },

    iconStyle: {
        width: 70,
        height: 70
    },

    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15
    },

    inputStyle: {
        width: '90%',
        borderRadius: 100,
        paddingLeft: 20,
        margin: 5,
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },

    buttonContainer: {
        backgroundColor: "#499BFD",
        width: '90%',
        borderRadius: 100,
        margin: 10
    },

    buttonStyle: {
        padding: 15,
        color: 'white',
        textAlign: 'center'
    },
})

export const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})