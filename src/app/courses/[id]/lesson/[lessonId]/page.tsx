
import LessonDetail from './LessonDetail';

export async function generateStaticParams() {
  return [
    { id: '1', lessonId: '1' },
    { id: '1', lessonId: '2' },
    { id: '1', lessonId: '3' },
    { id: '2', lessonId: '1' },
    { id: '2', lessonId: '2' },
    { id: '3', lessonId: '1' },
    { id: '4', lessonId: '1' },
    { id: '4', lessonId: '2' },
    { id: '4', lessonId: '3' },
    { id: '5', lessonId: '1' }
  ];
}

export default function LessonPage({ params }: { params: { id: string; lessonId: string } }) {
  return <LessonDetail courseId={params.id} lessonId={params.lessonId} />;
}
