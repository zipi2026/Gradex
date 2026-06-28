import type { ExamCardModel, ExamInitialPayload, ExamStatus, ResultsPayload } from '../types';

const API_BASE = '/api/student';

const parseJson = async (response: Response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error || payload?.message || response.statusText || 'Request failed';
    throw new Error(String(message));
  }
  return payload;
};

export const examService = {
  listExams: async (): Promise<ExamCardModel[]> => {
    const payload = await parseJson(await fetch(`${API_BASE}/exams`, { credentials: 'include' }));
    return (payload as Array<{ examId: number; name: string; subject: string; status: string; durationMinutes: number }>).map((exam) => ({
      ...exam,
      status: exam.status as ExamStatus,
    }));
  },
  getExam: async (examId: string): Promise<ExamInitialPayload> => {
    const payload = await parseJson(await fetch(`${API_BASE}/exams/${examId}`, { credentials: 'include' }));
    return payload as ExamInitialPayload;
  },
  saveAnswer: async (payload: { studentExamId: number; questionId: number; answerText: string | null; selectedOptionId: number | null }) => {
    const response = await fetch(`${API_BASE}/exams/${payload.studentExamId / 100}/answers`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return parseJson(response);
  },
  submitExam: async (studentExamId: number) => {
    const response = await fetch(`${API_BASE}/exams/${studentExamId / 100}/submit`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentExamId }),
    });
    return parseJson(response);
  },
  getResults: async (studentExamId: string): Promise<ResultsPayload> => {
    const payload = await parseJson(await fetch(`${API_BASE}/exams/${Number(studentExamId) / 100}/results`, { credentials: 'include' }));
    return payload as ResultsPayload;
  },
};
