import ballerina/http;

listener http:Listener userListener = new (8080);


type User record {
    int id;
    string name;
    string phoneNumber;
    string email;
};

service /users/v1 on userListener {
    resource function get users/[string email]() returns User {
        return {
            id: 1,
            name: "John",
            phoneNumber: "+18777804236",
            email: email
        };
    }
}
