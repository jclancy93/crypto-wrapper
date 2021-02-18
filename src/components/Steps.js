import classnames from "classnames";

const Step = ({number, name, icon, active, completed, lastStep}) => {
  const unstarted = !active && !completed
  const nameStyle = classnames('ml-4 text-sm', {
    'text-gray-200': completed,
    'font-medium': completed,
    'text-gray-400': unstarted,
    'font-medium': unstarted,
    'font-bold': active,
    'text-gray-50': active,
  })
  const circleStyle = classnames('flex flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 rounded-full', {
    'bg-indigo-600': active,
    'border-indigo-600': active,
  })
  const stepNumberStyle= classnames('text-sm font-medium', {
    'text-gray-200': completed,
    'text-gray-400': unstarted,
    'text-white': active,
    'font-bold': active,
  })

  return (
    <li className="relative md:flex-1 md:flex">
      {/* <!-- Current Step --> */}
      <span className="px-6 py-4 flex items-center text-sm font-medium">
        {completed ? (
          <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        ) : (
          <span className={circleStyle} aria-current="step">
            <span className={stepNumberStyle}>{number}</span>
          </span>
        )}
        <span className={nameStyle}>{name}</span>
      </span>

      {lastStep && (
      <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
        <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
          <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
        </svg>
      </div>
      )}
    </li>
  )
} 



export const Steps = ({ names, currentIndex }) => (
  <nav aria-label="Progress" className="mt-12 w-11/12 block mx-auto">
    <ol className="border border-gray-500 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
      {
        names.map((name, index) => (
          <Step key={name} name={name} number={index} active={currentIndex === index} completed={currentIndex > index} lastStep={index === names.length - 2}/>
        ))
      }
    </ol>
  </nav>
)