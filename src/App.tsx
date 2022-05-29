import React from 'react'
import './App.css';
import TestComponent from './TestComponent';

// ↓型推論のStringが効いている
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let username = "Hello";
// ↓Numberが効いている
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let dummuyNum: number = 2;
// ↓boolean
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let bool: boolean = true;

// オブジェクトに型を付けることも可
interface Name {
  first: string;
  // パイプを使って又はとすることも可
  last: string | null;
}
// ↑の型使用
let name: Name = { first:"Yamasaki",last:"Kyo" };

const func1 = (x: number, y: number) => {
  return x + y;
}

// Intersection Type
// 型を結合させる
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};
// ↓結合
type USER = PROFILE & LOGIN;
// ↑2つを結合して使用
const userA: USER = {
  age: 20,
  city: "tokyo",
  username: "Yamasaki",
  password:  "xxx"
}

// Union Types
// 論理和を使用できる
let value: boolean | number;
value = true;
value = 1;
// ↓配列に対しても入れる型を定義できる
let arrayUni: (number | string)[];
arrayUni = [0,1,2, "hello"];

// Literal Type
// ↓companyに入れることが出来るのは下記のうちのいずれかと制御をかけることが出来る(数字も同様)
let company: "facebook" | "google" | "amazon"
company = "google";

// typeof
// 宣言済関数の型を取得
let msg: string = "Hi";
let msg2: typeof msg;
msg2 = "hello";

// keyof
type KEYS = {
  primary: string;
  secondary: string;
};
// ↑のprimaryかsecondaryのどちらかのみのKEYを受け付ける
let key: keyof KEYS
key = "primary";

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
}
let KeySports: keyof typeof SPORTS;
KeySports = "soccer";

// enum
// enumで定義して上げた方がソフトウェアのバグを防げる
enum OS {
  Windows,
  Mac,
  Linux,
}
interface PC {
  id:number;
  OSType: OS;
}
const PC1: PC = {
  id:1,
  OSType: OS.Windows
}

// 型の互換性
const comp1 = "test";
let comp2: string = comp1;

// generics ジェネリックス
// reactのpropsを使う際、typeだと型を指定する必要がある
// その際に使用されるのがジェネリックス
// ↓型のテンプレートのようなイメージ
interface GEN<T> {
  item: T;
}
// ↑のTのエイリアスを型に変換して使用
const gen0: GEN<string> = {item:"Hello"};

// ↓デフォルトの指定も可能(constでの型指定が必要ない)
interface GEN1<T = string> {
  item: T;
}
const gen3: GEN1 = {item:"Hello"};

// パイプで型の指定も可能
interface GEN2<T extends string | number> {
  item: T;
}
const gen4: GEN2<string> = {item:"Hello"};

// 関数のジェネリックス化
function funcGen<T>(props: T) {
  return {item:props}
}
const gen6 = funcGen<string>("test");
const gen7 = funcGen<string | null>(null)

function funcGen1<T extends string | null>(props: T) {
  return {value: props};
}
const gen8 = funcGen1("Hello");

// propsでのgenericsの書き方
interface Props {
  price: number;
}
function funcGen3<T extends Props>(props: T) {
  return {value: props.price};
}

// アロー関数での書き方
const funcGen4 = <T extends Props>(props: T) => {
  return {value: props.price};
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="hello from App"/>
      </header>
    </div>
  );
}

export default App;
 