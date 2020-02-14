import { gql, GraphQLRequest } from "apollo-boost"

export const token = gql`
    fragment Token on Token{
        token  
    }
`

export default {}