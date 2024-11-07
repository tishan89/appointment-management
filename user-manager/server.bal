import ballerina/http;
import ballerina/lang.regexp;
import ballerina/random;

listener http:Listener userListener = new (8080);


type User record {
    int id;
    string name;
    string phoneNumber;
    string email;
};

service /users/v1 on userListener {
    resource function get users/[string email]() returns User|error {
        return {
            id: check random:createIntInRange(1, 100),
            name: string:toUpperAscii(email.substring(0,1)).concat((regexp:split(re `@`, email)[0]).substring(1)),
            phoneNumber: "+18777804236",
            email: email
        };
    }
}
