export type Month = 
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAaademicSemester =  {
    name:'Authumn' | 'Summar' | 'Fall',
    code:'01'|'02'|'03',
    year:string,
    startMonth:Month,
    endMonth:Month
}

export type TcreateAcademicSemesterService = {
  [key: string]: string
}