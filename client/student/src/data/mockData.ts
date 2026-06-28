import type { ExamCardModel, ExamInitialPayload, QuestionModel, ResultsPayload } from '../types';

export const mockExams: ExamCardModel[] = [
  {
    examId: 1,
    name: 'מבחן מועד א – אלגברה',
    subject: 'מתמטיקה',
    status: 'Active',
    durationMinutes: 45,
  },
  {
    examId: 2,
    name: 'מבחן היסטוריה – מסכם',
    subject: 'היסטוריה',
    status: 'InProgress',
    durationMinutes: 30,
  },
  {
    examId: 3,
    name: 'מבחן פיזיקה קצר',
    subject: 'מדעים',
    status: 'Submitted',
    durationMinutes: 20,
  },
  {
    examId: 4,
    name: 'מבחן ספרות – יצירות נבחרות',
    subject: 'ספרות',
    status: 'Graded',
    durationMinutes: 25,
  },
];

export const mockQuestions: Record<number, QuestionModel[]> = {
  1: [
    {
      questionId: 101,
      questionNumber: 1,
      text: 'פתרו את המשוואה: 3x + 7 = 22',
      type: 'MCQ',
      maxScore: 5,
      options: [
        { optionId: 1, text: '3' },
        { optionId: 2, text: '5' },
        { optionId: 3, text: '7' },
        { optionId: 4, text: '8' },
      ],
    },
    {
      questionId: 102,
      questionNumber: 2,
      text: 'הסבירו בקצרה מהי משתנה באלגברה.',
      type: 'TEXT',
      maxScore: 5,
      options: [],
    },
  ],
  2: [
    {
      questionId: 201,
      questionNumber: 1,
      text: 'מי חתם על מגילת זכויות היסוד?',
      type: 'MCQ',
      maxScore: 5,
      options: [
        { optionId: 1, text: 'המלך ג’ון' },
        { optionId: 2, text: 'המלך הנרי השמיני' },
        { optionId: 3, text: 'המלכה אליזבת הראשונה' },
        { optionId: 4, text: 'קרל הגדול' },
      ],
    },
  ],
  3: [
    {
      questionId: 301,
      questionNumber: 1,
      text: 'מהי החוק הראשון של ניוטון?',
      type: 'TEXT',
      maxScore: 5,
      options: [],
    },
  ],
  4: [
    {
      questionId: 401,
      questionNumber: 1,
      text: 'מהי הנושא המרכזי במחזה המלט?',
      type: 'MCQ',
      maxScore: 5,
      options: [
        { optionId: 1, text: 'אהבה ורומנטיקה' },
        { optionId: 2, text: 'נקמה ושחיתות' },
        { optionId: 3, text: 'מסע והרפתקה' },
        { optionId: 4, text: 'מדע וטכנולוגיה' },
      ],
    },
  ],
};

export const buildExamPayload = (examId: number): ExamInitialPayload => {
  const exam = mockExams.find((item) => item.examId === examId) ?? mockExams[0];
  const questions = mockQuestions[examId] ?? [];
  const now = new Date();
  const startTime = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
  const endTime = new Date(now.getTime() + 20 * 60 * 1000).toISOString();

  return {
    exam: {
      examId: exam.examId,
      name: exam.name,
      subject: exam.subject,
      durationMinutes: exam.durationMinutes,
    },
    studentExam: {
      studentExamId: exam.examId * 100,
      status: exam.status,
      startTime,
      endTime,
    },
    questions,
    answers: [],
    serverTime: now.toISOString(),
  };
};

export const buildResultsPayload = (examId: number): ResultsPayload => {
  const exam = mockExams.find((item) => item.examId === examId) ?? mockExams[0];
  return {
    examName: exam.name,
    subject: exam.subject,
    score: 8,
    questions: [
      {
        questionId: 101,
        text: 'פתרו את המשוואה: 3x + 7 = 22',
        studentAnswer: '5',
        correctAnswer: '5',
        isCorrect: true,
        score: 5,
        maxScore: 5,
      },
      {
        questionId: 102,
        text: 'הסבירו בקצרה מהי משתנה באלגברה.',
        studentAnswer: 'ערך מארגן.',
        correctAnswer: 'סמל המייצג ערך לא ידוע.',
        isCorrect: false,
        score: 3,
        maxScore: 5,
      },
    ],
  };
};
