import ReactHtmlParser from "react-html-parser";
import React from 'react'
const Extractive = (props) => {
  const { isloading } = props;
  return (
    <div className="container-fluid">
      <div className="container-fluid my-1">
        {/* gx-2 ห่างระหว่างกัน 
                p-3 สูง
            */}
         {isloading && (<div className="row gx-3">
          <div className="col white" style={{ backgroundColor: "#FFFF" }}>
            <div className="p-3 border bg-light shadow p-3 mb-2 bg-body rounded ">
              <p className="p-3">
                <h4>ข้อมูลต้นฉบับ</h4>
              </p>
              <label className="p-3">
                จำนวนคำ: <strong>{props.count_word_con}</strong> คำ
              </label>
              <label className="p-3">
                จำนวนคำที่ไม่เจอ : {props.int_wordnotFound_ext} คำ
              </label>
              <label className="p-3">
                คำที่ไม่เจอ :{" "}
                {props.wordnotFound_ext.map((data) => {
                  return data.map((data, index) => {
                    return <span key={index}>{`${data},`}</span>;
                  });
                })}
              </label>
            </div>
          </div>
          <div className="col white" style={{ backgroundColor: "#FFFF" }}>
            <div className="p-3 border bg-light shadow p-3 mb-5 bg-body rounded ">
              <p className="p-3">
                <h4>ผลสรุป Extractive</h4>
              </p>
              <label className="p-3">
                จำนวนคำ: <strong>{props.count_word_ext}</strong> คำ
              </label>
              <label className="p-3">
                ความเหมือนของข้อมูล : <strong>{props.data_ext}</strong> %
              </label>
              <label className="p-3">
                จำนวนคำที่ถูกเจอ :
                <strong>{props.int_wordFound_content_ext}</strong> คำ
              </label>
            </div>
          </div>
        </div>)}
      </div>
      {isloading && (
        <div className="container-fluid d-flex justify-content-between">
          <div className="row ">
            <div className="col bg-light p-3  border m-1 shadow p-3 mb-5 bg-body rounded">
              <section>
                <p className="">{ReactHtmlParser(props.text_content_def)}</p>
              </section>
            </div>
            <div className="col bg-light p-3  border m-1 shadow p-3 mb-5 bg-body rounded">
              <section>
                <p>{ReactHtmlParser(props.text_extractive_def)}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Extractive;
