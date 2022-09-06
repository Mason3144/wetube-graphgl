import { gql } from "apollo-server-express";

export default gql`
type Chennel{
    id:Int!
    user:User!
    createdAt:String!
    updatedAt:String!
}
`