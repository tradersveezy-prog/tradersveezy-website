import { useState } from 'react'
import {
  allLiveCoursesComplete,
  markCourseComplete,
  type LiveCourseId,
} from '../progress'
import { ModuleComplete } from './ModuleComplete'
import { ModuleSuccess } from './ModuleSuccess'

type Props = {
  courseId: LiveCourseId
  courseTitle: string
  phrase: string
  beats: string[]
  takeaway: string
  nextLabel: string
  nextTo: string
  secondaryLabel?: string
  secondaryTo?: string
  onRestart: () => void
  sharePath: string
}

export function CourseFinish({
  courseId,
  courseTitle,
  phrase,
  beats,
  takeaway,
  nextLabel,
  nextTo,
  secondaryLabel,
  secondaryTo,
  onRestart,
  sharePath,
}: Props) {
  const [showCert] = useState(() => {
    markCourseComplete(courseId)
    return allLiveCoursesComplete()
  })

  if (showCert) {
    return (
      <ModuleComplete
        courseN={courseId}
        courseTitle={courseTitle}
        phrase={phrase}
        nextLabel={nextLabel}
        nextTo={nextTo}
        secondaryLabel={secondaryLabel}
        secondaryTo={secondaryTo}
        onRestart={onRestart}
        sharePath={sharePath}
      />
    )
  }

  return (
    <ModuleSuccess
      courseN={courseId}
      courseTitle={courseTitle}
      phrase={phrase}
      beats={beats}
      takeaway={takeaway}
      nextLabel={nextLabel}
      nextTo={nextTo}
      secondaryLabel={secondaryLabel}
      secondaryTo={secondaryTo}
      onRestart={onRestart}
    />
  )
}
