const Table = ({strokeColor}) => {
  return (
    <div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 12.5H17.5M2.5 7.5H17.5M7.5 17.5V2.5M12.5 17.5V2.5M4.5 2.5H15.5C16.0304 2.5 16.5391 2.71071 16.9142 3.08579C17.2893 3.46086 17.5 3.96957 17.5 4.5V15.5C17.5 16.0304 17.2893 16.5391 16.9142 16.9142C16.5391 17.2893 16.0304 17.5 15.5 17.5H4.5C3.96957 17.5 3.46086 17.2893 3.08579 16.9142C2.71071 16.5391 2.5 16.0304 2.5 15.5V4.5C2.5 4.23736 2.55173 3.97728 2.65224 3.73463C2.75275 3.49198 2.90007 3.2715 3.08579 3.08579C3.46086 2.71071 3.96957 2.5 4.5 2.5Z" stroke={strokeColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

    </div>
  )
}

export default Table
