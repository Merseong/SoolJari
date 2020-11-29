# 술자리 - SoolJari

For my perfect alcohol life

[![CodeFactor](https://www.codefactor.io/repository/github/merseong/sooljari/badge?s=7aaf9723c4ad27864121ccc4fdbb83dcc5660310)](https://www.codefactor.io/repository/github/merseong/sooljari)

## 프로젝트 초기 세팅

### 초기 설치

현재는 Codespace 절찬 이용중 (12월 31일까지)

[Git](https://git-scm.com/download/win)

[Node.js](https://nodejs.org/dist/v14.15.0/node-v14.15.0-x64.msi)

[VS Code](https://aka.ms/win32-x64-user-stable)

```
$ git clone <git address>
$ git config user.name "Name"
$ git config user.email "Email@e.e"
$ git checkout -t origin/development
```
또는...  
ssajiAutoset.sh 실행 (git 세팅, firebase 세팅 자동화)

### 초기 개발용 세팅

```
$ cd hosting
$ npm i
$ npx firebase login
$ npm run preview
```
프로젝트가 연결되지 않았을 경우
```
$ npx firebase use --add
-> alias는 default로
```

### Firebase에 Deploy하는 방법

```
$ cd hosting
$ npx firebase login
$ npm run deploy
```
또는...
```
$ npx firebase hosting:clone sooljari-alcdb:preview sooljari-alcdb:live
```

## 아무말

술 데이터베이스를 보여줄 웹 사이트를 만들것

1. 술에 대해 검색하고 그 정보를 볼 수 있어야된다. -> 이름, 도수, 만든곳, 파는곳?, 가격?, 맛, 등등 -> 레퍼런스로 사용해도 될 정도의 정확함
2. 내가 먹었던 술을 저장해두고, 리뷰같은걸 쓸 수 있어야 한다. 다른사람도 이 리뷰를 볼 수 있게 - 술을 콜렉팅하는 기분을 낼 수 있도록 - 레벨과 경험치?
3. 내가 좋다고 평가한, 나쁘다고 평가한 술들을 기반으로 먹어보지 않은 술을 추천해줬으면 좋겠다.
4. 술 사진 찍으면 무슨 술인지 찾아주면 좋겠다.
5. 사이트가 예뻐야한다. 감성터지게
6. 카톡에 검색하면 정보를 확인할 수 있게 (공유가능, 검색가능)
7. 술 마시는게 즐겁다는 기분과, 그걸 공유할 수 있는
8. 같이 먹으면 좋은 안주들도? 어디서 먹을수 있는지도 알수있게?
9. 커스텀 가능한 초기화면
10. 별자리 - 술자리, 어두운 밤하늘에 술한잔

[노션에 쓰는 문서](https://www.notion.so/merseong/DB-b18d231429274d9c9415259771d74ba5)
