let isDone: boolean = false;

let decLiteral: number = 6;

declare function create(o: object | null): void;

create({})

const someValue: string = '';
let strLength: number = (someValue as string).length;


interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: config.color || 'white', area: 100};

    return newSquare;
}

createSquare({hello: '', width: 1})

interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 10, y: 20};
console.log(p1.x);
