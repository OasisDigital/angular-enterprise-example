// Work around CLI issue
// https://github.com/angular/angular-cli/issues/2034

export interface IView {
  age: number;
  region: string;
  date: string;
}

export interface IVideo {
  title: string;
  author: string;
  id: string;
  viewDetails: IView[];
}

