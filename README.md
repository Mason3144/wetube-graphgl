## User

- [x] User model
- [x] Create account(hash password)
- [x] Login
- [x] loggedinUser/protectedUser
- [x] Edit profile(hash password)
- [x] My profile
- [x] Avatar upload (editProfile-avatar)
- [x] social api login/social create account
- [x] Email verification

--Email verification/Backend--
schema verification model 생성후 unique 코드 생성
model user 와 연결 후 verified field defalt false
mailgun email [variable]에 code 추가 후 user-verified의 사용자 고유 코드 전송

--Email verification/Frontend--
사용자가 email을 클릭시에 arg로 url의 code 삽입후 Mutation verifyEmail실행

## Video

- [x] Chennel Model
- [x] Create/Delete Chennel
- [x] Video Model
- [x] Create Video
- [x] See Video
- [x] Edit Video
- [x] Delete Video
- [x] Upload Video, createVideo/deleteVideo
- [x] See all comments(pagination)

- [] Views
- [] isMine, total likes(comments)
- [] subscription

## Hashtag

- [x] Hashtag, createVideo/editVideo
- [x] seeHashtags

## Comment

- [x] Model Comment (relation with User and Video)
- [x] Create/Edit/Delete Comment

## Likes

- [x] Video likes (toggle, total likes) array안에 특정 유저가 있는지 없는지 체크
- [x] Comment likes (toggle)

## Search videos and chennels
