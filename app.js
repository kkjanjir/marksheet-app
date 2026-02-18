const { useState, useRef } = React;
const { Printer, Upload, Plus, Trash2, FileText, Settings } = lucide;

const MarksheetApp = () => {
  const [activeTab, setActiveTab] = useState('editor');
  
  const [schoolInfo, setSchoolInfo] = useState({
    name: "GYANSTHALI ACADEMY",
    addressLine1: "Krishna Nagar Derapur Kanpur Dehat(U.P.)-209301",
    email: "gyansthaliderapur@gmail.com",
    reportTitle: "PROGRESS EVALUATION REPORT",
    logo: "https://via.placeholder.com/100x100?text=Logo"
  });

  const [student, setStudent] = useState({
    name: "AYUSH YADAV",
    father: "RAJKUMAR",
    mother: "MADHU YADAV",
    address: "LALPURWADERAPUR",
    roll: "19",
    admission: "128",
    dob: "2018-04-24",
    class: "1st-A",
    session: "2025-26",
    photo: "https://via.placeholder.com/80x100?text=Photo"
  });

  const [subjects, setSubjects] = useState([
    { id: 1, name: "HINDI", mm1: 50, obt1: 49, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 2, name: "ENGLISH", mm1: 50, obt1: 41, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 3, name: "MATHS", mm1: 50, obt1: 45, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 4, name: "E.V.S.", mm1: 50, obt1: 47, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 5, name: "Art", mm1: 50, obt1: 40, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 6, name: "Grammar", mm1: 50, obt1: 43, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 7, name: "Computer", mm1: 50, obt1: 38, mm2: 50, obt2: "", mm3: 50, obt3: "" },
    { id: 8, name: "G.K.", mm1: 50, obt1: 50, mm2: 50, obt2: "", mm3: 50, obt3: "" }
  ]);

  const [remarks, setRemarks] = useState({
    remark: "",
    rank: "",
    attendance: ""
  });

  const calculateTotal = (sub) => {
    const o1 = parseFloat(sub.obt1) || 0;
    const o2 = parseFloat(sub.obt2) || 0;
    const o3 = parseFloat(sub.obt3) || 0;
    return o1 + o2 + o3;
  };

  const calculateMMTotal = (sub) => {
    const m1 = parseFloat(sub.mm1) || 0;
    const m2 = parseFloat(sub.mm2) || 0;
    const m3 = parseFloat(sub.mm3) || 0;
    return m1 + m2 + m3;
  };

  const grandTotals = subjects.reduce((acc, sub) => {
    acc.mm1 += parseFloat(sub.mm1) || 0;
    acc.obt1 += parseFloat(sub.obt1) || 0;
    acc.mm2 += parseFloat(sub.mm2) || 0;
    acc.obt2 += parseFloat(sub.obt2) || 0;
    acc.mm3 += parseFloat(sub.mm3) || 0;
    acc.obt3 += parseFloat(sub.obt3) || 0;
    acc.mmGrand += calculateMMTotal(sub);
    acc.obtGrand += calculateTotal(sub);
    return acc;
  }, { mm1: 0, obt1: 0, mm2: 0, obt2: 0, mm3: 0, obt3: 0, mmGrand: 0, obtGrand: 0 });

  const percentage = grandTotals.mmGrand > 0 
    ? ((grandTotals.obtGrand / grandTotals.mmGrand) * 100).toFixed(1) 
    : 0;

  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleRemarkChange = (e) => {
    setRemarks({ ...remarks, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects(subjects.map(sub => 
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  };

  const addSubject = () => {
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    setSubjects([...subjects, { id: newId, name: "New Subject", mm1: 50, obt1: "", mm2: 50, obt2: "", mm3: 50, obt3: "" }]);
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const handleImageUpload = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (type === 'logo') setSchoolInfo({ ...schoolInfo, logo: url });
      if (type === 'photo') setStudent({ ...student, photo: url });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const logoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  return (
    React.createElement('div', { className: "min-h-screen bg-gray-100 font-sans flex flex-col md:flex-row" },
      
      // EDITOR PANEL
      React.createElement('div', { 
        className: `w-full md:w-1/3 lg:w-96 bg-white shadow-lg overflow-y-auto z-10 p-4 border-r border-gray-200 print:hidden ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`,
        style: {height: '100vh'}
      },
        React.createElement('div', { className: "flex items-center justify-between mb-6" },
          React.createElement('h2', { className: "text-xl font-bold text-gray-800 flex items-center gap-2" },
            React.createElement(Settings, { className: "w-5 h-5 text-blue-600" }),
            "Details Editor"
          ),
          React.createElement('button', { onClick: handlePrint, className: "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium md:hidden" }, "Print")
        ),

        // Student Details
        React.createElement('div', { className: "space-y-4 mb-8" },
          React.createElement('h3', { className: "font-semibold text-gray-700 border-b pb-1" }, "Student Information"),
          React.createElement('div', { className: "grid grid-cols-2 gap-3" },
            React.createElement('div', { className: "col-span-2" },
              React.createElement('label', { className: "text-xs text-gray-500" }, "Student Name"),
              React.createElement('input', { type: "text", name: "name", value: student.name, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-200 outline-none" })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "Class"),
              React.createElement('input', { type: "text", name: "class", value: student.class, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "Session"),
              React.createElement('input', { type: "text", name: "session", value: student.session, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "Roll No"),
              React.createElement('input', { type: "text", name: "roll", value: student.roll, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "Adm No"),
              React.createElement('input', { type: "text", name: "admission", value: student.admission, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', { className: "col-span-2" },
              React.createElement('label', { className: "text-xs text-gray-500" }, "Father's Name"),
              React.createElement('input', { type: "text", name: "father", value: student.father, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', { className: "col-span-2" },
              React.createElement('label', { className: "text-xs text-gray-500" }, "Mother's Name"),
              React.createElement('input', { type: "text", name: "mother", value: student.mother, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', { className: "col-span-2" },
              React.createElement('label', { className: "text-xs text-gray-500" }, "Address"),
              React.createElement('input', { type: "text", name: "address", value: student.address, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "DOB"),
              React.createElement('input', { type: "date", name: "dob", value: student.dob, onChange: handleStudentChange, className: "w-full p-2 border rounded text-sm outline-none" })
            )
          )
        ),

        // Images Upload
        React.createElement('div', { className: "space-y-4 mb-8" },
          React.createElement('h3', { className: "font-semibold text-gray-700 border-b pb-1" }, "Images"),
          React.createElement('div', { className: "flex gap-4" },
            React.createElement('div', { className: "flex-1" },
              React.createElement('button', { onClick: () => logoInputRef.current.click(), className: "w-full py-2 bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-400 rounded text-xs flex flex-col items-center justify-center gap-1 text-gray-600 transition" },
                React.createElement(Upload, { size: 14 }), "School Logo"
              ),
              React.createElement('input', { type: "file", ref: logoInputRef, className: "hidden", accept: "image/*", onChange: (e) => handleImageUpload(e, 'logo') })
            ),
            React.createElement('div', { className: "flex-1" },
              React.createElement('button', { onClick: () => photoInputRef.current.click(), className: "w-full py-2 bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-400 rounded text-xs flex flex-col items-center justify-center gap-1 text-gray-600 transition" },
                React.createElement(Upload, { size: 14 }), "Student Photo"
              ),
              React.createElement('input', { type: "file", ref: photoInputRef, className: "hidden", accept: "image/*", onChange: (e) => handleImageUpload(e, 'photo') })
            )
          )
        ),

        // Marks Entry
        React.createElement('div', { className: "space-y-4 mb-8" },
          React.createElement('div', { className: "flex justify-between items-center border-b pb-1" },
            React.createElement('h3', { className: "font-semibold text-gray-700" }, "Marks Entry"),
            React.createElement('button', { onClick: addSubject, className: "text-blue-600 hover:text-blue-800 text-xs flex items-center font-bold" },
              React.createElement(Plus, { size: 12, className: "mr-1" }), "Add Subject"
            )
          ),
          React.createElement('div', { className: "space-y-4" },
            subjects.map((sub) =>
              React.createElement('div', { key: sub.id, className: "bg-gray-50 p-3 rounded border border-gray-200" },
                React.createElement('div', { className: "flex justify-between items-center mb-2" },
                  React.createElement('input', {
                    type: "text", value: sub.name,
                    onChange: (e) => handleSubjectChange(sub.id, 'name', e.target.value),
                    className: "font-bold text-gray-700 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-2/3"
                  }),
                  React.createElement('button', { onClick: () => removeSubject(sub.id), className: "text-red-500 hover:text-red-700" },
                    React.createElement(Trash2, { size: 14 })
                  )
                ),
                React.createElement('div', { className: "grid grid-cols-3 gap-2 text-center" },
                  React.createElement('div', { className: "text-xs font-semibold text-gray-500" }, "Term 1"),
                  React.createElement('div', { className: "text-xs font-semibold text-gray-500" }, "Term 2"),
                  React.createElement('div', { className: "text-xs font-semibold text-gray-500" }, "Term 3"),
                  React.createElement('div', { className: "flex gap-1" },
                    React.createElement('input', { type: "number", placeholder: "MM", value: sub.mm1, onChange: (e) => handleSubjectChange(sub.id, 'mm1', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center" }),
                    React.createElement('input', { type: "number", placeholder: "Obt", value: sub.obt1, onChange: (e) => handleSubjectChange(sub.id, 'obt1', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center bg-white font-bold" })
                  ),
                  React.createElement('div', { className: "flex gap-1" },
                    React.createElement('input', { type: "number", placeholder: "MM", value: sub.mm2, onChange: (e) => handleSubjectChange(sub.id, 'mm2', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center" }),
                    React.createElement('input', { type: "number", placeholder: "Obt", value: sub.obt2, onChange: (e) => handleSubjectChange(sub.id, 'obt2', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center bg-white font-bold" })
                  ),
                  React.createElement('div', { className: "flex gap-1" },
                    React.createElement('input', { type: "number", placeholder: "MM", value: sub.mm3, onChange: (e) => handleSubjectChange(sub.id, 'mm3', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center" }),
                    React.createElement('input', { type: "number", placeholder: "Obt", value: sub.obt3, onChange: (e) => handleSubjectChange(sub.id, 'obt3', e.target.value), className: "w-1/2 p-1 text-xs border rounded text-center bg-white font-bold" })
                  )
                )
              )
            )
          )
        ),

        // Remarks
        React.createElement('div', { className: "space-y-4 pb-20" },
          React.createElement('h3', { className: "font-semibold text-gray-700 border-b pb-1" }, "Remarks & Status"),
          React.createElement('div', { className: "grid grid-cols-1 gap-3" },
            React.createElement('div', null,
              React.createElement('label', { className: "text-xs text-gray-500" }, "Teacher's Remark"),
              React.createElement('input', { type: "text", name: "remark", value: remarks.remark, onChange: handleRemarkChange, className: "w-full p-2 border rounded text-sm outline-none", placeholder: "e.g. Excellent Work" })
            ),
            React.createElement('div', { className: "grid grid-cols-2 gap-3" },
              React.createElement('div', null,
                React.createElement('label', { className: "text-xs text-gray-500" }, "Rank"),
                React.createElement('input', { type: "text", name: "rank", value: remarks.rank, onChange: handleRemarkChange, className: "w-full p-2 border rounded text-sm outline-none" })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "text-xs text-gray-500" }, "Attendance"),
                React.createElement('input', { type: "text", name: "attendance", value: remarks.attendance, onChange: handleRemarkChange, className: "w-full p-2 border rounded text-sm outline-none" })
              )
            )
          )
        )
      ),

      // PREVIEW PANEL
      React.createElement('div', { className: `flex-grow bg-gray-700 p-4 md:p-8 overflow-auto flex justify-center ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}` },
        React.createElement('div', {
          id: "marksheet-preview",
          className: "bg-white shadow-2xl relative print:shadow-none print:m-0 print:w-full print:h-full",
          style: { width: '210mm', minHeight: '297mm', padding: '5mm', boxSizing: 'border-box' }
        },
          React.createElement('div', { className: "h-full border-2 border-red-600 p-[3px] flex flex-col" },
            React.createElement('div', { className: "flex-grow border border-black p-[5px] flex flex-col relative" },

              // HEADER
              React.createElement('div', { className: "flex justify-between items-start mb-2", style: {height: '140px'} },
                React.createElement('div', { className: "w-24 h-24 relative flex-shrink-0" },
                  React.createElement('img', { src: schoolInfo.logo, alt: "School Logo", className: "w-full h-full object-contain" })
                ),
                React.createElement('div', { className: "flex-grow text-center pt-2 px-2 overflow-hidden" },
                  React.createElement('h1', { className: "text-red-600 text-3xl font-extrabold uppercase tracking-wide leading-tight" }, schoolInfo.name),
                  React.createElement('div', { className: "text-xs font-semibold text-black my-1" }, schoolInfo.addressLine1 + " EmailID:-"),
                  React.createElement('div', { className: "text-xs font-semibold text-blue-800 underline mb-2" }, schoolInfo.email),
                  React.createElement('div', { className: "inline-block bg-yellow-300 text-red-600 px-4 py-1 font-bold text-sm border-b-2 border-red-600 underline mb-2" }, schoolInfo.reportTitle),
                  React.createElement('div', { className: "text-sm font-bold text-blue-900 mt-1" }, "ACADEMIC SESSION: ", React.createElement('span', { className: "text-black" }, student.session)),
                  React.createElement('div', { className: "text-xl font-bold text-purple-900 mt-1" }, "CLASS: ", React.createElement('span', { className: "text-black ml-1" }, student.class))
                ),
                React.createElement('div', { className: "w-24 h-28 border border-black p-1 bg-gray-50 flex-shrink-0" },
                  React.createElement('img', { src: student.photo, alt: "Student", className: "w-full h-full object-cover" })
                )
              ),

              // STUDENT INFO BOX
              React.createElement('div', { className: "bg-teal-100 border-y-2 border-black p-2 mb-2 flex justify-between", style: {height: '100px', fontFamily: '"Times New Roman", serif'} },
                React.createElement('div', { className: "flex flex-col justify-evenly text-xs font-bold w-2/3" },
                  React.createElement('div', { className: "flex items-center" }, React.createElement('span', { className: "w-32 inline-block" }, "STUDENT'S NAME"), " : ", React.createElement('span', { className: "uppercase ml-1" }, student.name)),
                  React.createElement('div', { className: "flex items-center" }, React.createElement('span', { className: "w-32 inline-block" }, "MOTHER'S NAME"), " : ", React.createElement('span', { className: "uppercase ml-1" }, student.mother)),
                  React.createElement('div', { className: "flex items-center" }, React.createElement('span', { className: "w-32 inline-block" }, "FATHER'S NAME"), " : ", React.createElement('span', { className: "uppercase ml-1" }, student.father)),
                  React.createElement('div', { className: "flex items-center" }, React.createElement('span', { className: "w-32 inline-block" }, "ADDRESS"), " : ", React.createElement('span', { className: "uppercase ml-1 truncate" }, student.address))
                ),
                React.createElement('div', { className: "flex flex-col justify-evenly text-xs font-bold text-right w-1/3" },
                  React.createElement('div', null, React.createElement('span', { className: "mr-2" }, "ROLL NO"), " : ", React.createElement('span', { className: "ml-1" }, student.roll)),
                  React.createElement('div', null, React.createElement('span', { className: "mr-2" }, "ADMISSION NO"), " : ", React.createElement('span', { className: "ml-1" }, student.admission)),
                  React.createElement('div', null, React.createElement('span', { className: "mr-2" }, "DOB"), " : ", React.createElement('span', { className: "ml-1" }, student.dob))
                )
              ),

              // MARKS TABLE
              React.createElement('div', { className: "flex-grow flex flex-col mb-1" },
                React.createElement('table', { className: "w-full border-collapse font-sans text-xs", style: {tableLayout: 'fixed'} },
                  React.createElement('thead', null,
                    React.createElement('tr', { className: "bg-orange-100", style: {height: '35px'} },
                      React.createElement('th', { rowSpan: 2, className: "border border-black w-1/5 text-left pl-2 font-bold text-sm" }, "SUBJECTS"),
                      React.createElement('th', { colSpan: 2, className: "border border-black text-blue-900 text-xs" }, "FIRST TERM EXAM"),
                      React.createElement('th', { colSpan: 2, className: "border border-black text-blue-900 text-xs" }, "SECOND TERM EXAM"),
                      React.createElement('th', { colSpan: 2, className: "border border-black text-blue-900 text-xs" }, "THIRD TERM EXAM"),
                      React.createElement('th', { colSpan: 2, className: "border border-black text-blue-900 text-xs" }, "GRAND TOTAL")
                    ),
                    React.createElement('tr', { className: "bg-orange-100", style: {height: '30px'} },
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold w-1/12" }, "MM"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold" }, "MARKS OBT"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold w-1/12" }, "MM"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold" }, "MARKS OBT"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold w-1/12" }, "MM"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold" }, "MARKS OBT"),
                      React.createElement('th', { className: "border border-black text-blue-600 font-bold w-1/12" }, "MM"),
                      React.createElement('th', { className: "border border-black" }, "Total")
                    )
                  ),
                  React.createElement('tbody', null,
                    subjects.map((sub) =>
                      React.createElement('tr', { key: sub.id, style: {height: '30px'} },
                        React.createElement('td', { className: "border border-black pl-2 font-bold text-left uppercase" }, sub.name),
                        React.createElement('td', { className: "border border-black text-center text-blue-600 font-bold" }, sub.mm1),
                        React.createElement('td', { className: "border border-black text-center" }, sub.obt1),
                        React.createElement('td', { className: "border border-black text-center text-blue-600 font-bold" }, sub.mm2),
                        React.createElement('td', { className: "border border-black text-center" }, sub.obt2),
                        React.createElement('td', { className: "border border-black text-center text-blue-600 font-bold" }, sub.mm3),
                        React.createElement('td', { className: "border border-black text-center" }, sub.obt3),
                        React.createElement('td', { className: "border border-black text-center text-blue-600 font-bold" }, calculateMMTotal(sub)),
                        React.createElement('td', { className: "border border-black text-center font-bold" }, calculateTotal(sub) || "")
                      )
                    ),
                    [...Array(Math.max(0, 10 - subjects.length))].map((_, i) =>
                      React.createElement('tr', { key: `pad-${i}`, style: {height: '30px'} },
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" }),
                        React.createElement('td', { className: "border border-black" })
                      )
                    ),
                    React.createElement('tr', { className: "bg-gray-100 font-bold", style: {height: '35px'} },
                      React.createElement('td', { className: "border border-black pl-2 text-left" }, "TOTAL"),
                      React.createElement('td', { className: "border border-black text-center text-blue-600" }, grandTotals.mm1),
                      React.createElement('td', { className: "border border-black text-center" }, grandTotals.obt1),
                      React.createElement('td', { className: "border border-black text-center text-blue-600" }, grandTotals.mm2),
                      React.createElement('td', { className: "border border-black text-center" }, grandTotals.obt2),
                      React.createElement('td', { className: "border border-black text-center text-blue-600" }, grandTotals.mm3),
                      React.createElement('td', { className: "border border-black text-center" }, grandTotals.obt3),
                      React.createElement('td', { className: "border border-black text-center text-blue-600" }, grandTotals.mmGrand),
                      React.createElement('td', { className: "border border-black text-center" }, grandTotals.obtGrand)
                    ),
                    React.createElement('tr', { className: "bg-gray-100 font-bold", style: {height: '35px'} },
                      React.createElement('td', { className: "border border-black pl-2 text-left" }, "PERCENTAGE"),
                      React.createElement('td', { colSpan: 2, className: "border border-black text-center" }, grandTotals.mm1 > 0 ? ((grandTotals.obt1/grandTotals.mm1)*100).toFixed(0) + '%' : ''),
                      React.createElement('td', { colSpan: 2, className: "border border-black text-center" }, grandTotals.mm2 > 0 ? ((grandTotals.obt2/grandTotals.mm2)*100).toFixed(0) + '%' : ''),
                      React.createElement('td', { colSpan: 2, className: "border border-black text-center" }, grandTotals.mm3 > 0 ? ((grandTotals.obt3/grandTotals.mm3)*100).toFixed(0) + '%' : ''),
                      React.createElement('td', { colSpan: 2, className: "border border-black text-center text-lg" }, percentage + '%')
                    )
                  )
                )
              ),

              // CO-SCHOLASTIC
              React.createElement('div', { className: "bg-orange-100 font-bold text-xs p-1 border border-black flex justify-between items-center mb-2" },
                React.createElement('span', null, "Co-Scholastic Area"),
                React.createElement('span', { className: "text-right" }, "A+:OUTSTANDING, A:EXCELLENT, B+:VERY GOOD, B:GOOD, C:AVERAGE")
              ),

              // GRADING SCALE
              React.createElement('div', { className: "flex border border-black mb-4 text-xs", style: {height: '35px'} },
                React.createElement('div', { className: "bg-gray-600 text-white font-bold w-1/5 flex items-center justify-center text-center" }, "MARK RANGE: GRADE"),
                React.createElement('div', { className: "w-4/5 flex" },
                  ['91-100:A1','81-90:A2','71-80:B1','61-70:B2','51-60:C1','41-50:C2','33-40:D','21-32:E1','00-20:E2'].map((g, i) =>
                    React.createElement('div', { key: i, className: "flex-1 bg-blue-100 border-r border-white flex items-center justify-center" }, g)
                  )
                )
              ),

              // FOOTER
              React.createElement('div', { className: "mt-auto" },
                React.createElement('div', { className: "flex justify-between items-end text-sm font-bold px-2 mb-10" },
                  React.createElement('div', { className: "flex items-end w-1/3" }, "Remark: ", React.createElement('div', { className: "border-b border-black flex-grow ml-2" }, remarks.remark)),
                  React.createElement('div', { className: "flex items-end w-1/4 justify-center" }, "Rank: ", React.createElement('div', { className: "border-b border-black w-16 text-center mx-2" }, remarks.rank)),
                  React.createElement('div', { className: "flex items-end w-1/3" }, "Attendance: ", React.createElement('div', { className: "border-b border-black flex-grow ml-2" }, remarks.attendance))
                ),
                React.createElement('div', { className: "flex justify-between text-sm font-bold px-8 mb-4" },
                  React.createElement('div', { className: "text-center" }, React.createElement('div', { className: "border-t-2 border-dotted border-black w-40 mb-1" }), "Date"),
                  React.createElement('div', { className: "text-center" }, React.createElement('div', { className: "border-t-2 border-dotted border-black w-40 mb-1" }), "ClassTeacher"),
                  React.createElement('div', { className: "text-center" }, React.createElement('div', { className: "border-t-2 border-dotted border-black w-40 mb-1" }), "Principal")
                )
              )
            )
          )
        )
      ),

      // MOBILE NAV
      React.createElement('div', { className: "fixed bottom-0 left-0 w-full bg-white border-t md:hidden flex justify-around p-3 z-50 print:hidden" },
        React.createElement('button', { onClick: () => setActiveTab('editor'), className: `flex flex-col items-center text-xs ${activeTab === 'editor' ? 'text-blue-600 font-bold' : 'text-gray-500'}` },
          React.createElement(Settings, { size: 20 }), "Edit Data"
        ),
        React.createElement('button', { onClick: () => setActiveTab('preview'), className: `flex flex-col items-center text-xs ${activeTab === 'preview' ? 'text-blue-600 font-bold' : 'text-gray-500'}` },
          React.createElement(FileText, { size: 20 }), "View Sheet"
        )
      ),

      // PRINT BUTTON
      React.createElement('button', {
        onClick: handlePrint,
        className: "fixed bottom-16 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 z-50 flex items-center gap-2 print:hidden md:bottom-6"
      },
        React.createElement(Printer, { size: 24 }),
        React.createElement('span', { className: "hidden md:inline font-bold" }, "Print Marksheet")
      ),

      // PRINT STYLES
      React.createElement('style', null, `
        @media print {
          body * { visibility: hidden; }
          #marksheet-preview, #marksheet-preview * { visibility: visible; }
          #marksheet-preview {
            position: absolute; left: 0; top: 0;
            width: 210mm; height: 297mm;
            margin: 0; padding: 0 !important; box-shadow: none !important;
          }
          @page { size: A4; margin: 0; }
        }
      `)
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(MarksheetApp));
