import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
    avatar: String
    firstName: String!
    lastName: String
    videos: [Video!]!
    chennel: Chennel!
    createdAt: String!
    updatedAt: String!
  }
`;
// 다른 모델 삽입시 client...({include:})또는 resolver-User-다른모델   로 연결시켜주어야됨
//client...({include})사용시 사용요청마다 매번 include된 모델을 db에서 불러오므로 주의
//resolver사용시 필요할때만 요청
