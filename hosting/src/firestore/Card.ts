export interface Tag {
    name: string,
    importance: number,
}

export interface RouteTag extends Tag {
    parent: string,
}

export enum CardType {
    default,
    alcohol,
    coffee,
    food,

}

export class Card {
    type: CardType;
    title: string; // 카드의 제목
    altTags: Array<Tag>; // 이명 태그 목록
    otherTags: Array<Tag>; // 기타 태그 목록
    classifies: Array<RouteTag>; // 분류 목록

    constructor(title:string) {
        this.type = CardType.default;
        this.title = title;
        this.altTags = [];
        this.otherTags = [];
        this.classifies = [];
    }
}
