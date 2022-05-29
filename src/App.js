import { useState } from 'react';
import './App.css';
import Eye from './input-eye.svg'

const App = () => {
  const initialValues = {username: "", mailAddress: "", password: ""}
const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setformErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);
const [inputpass, setinputpass] = useState('text');

const handleChange = (e) => {
  const {name, value} = e.target;
  setFormValues({...formValues, [name]: value});
};

const handleSubmit = (e) => {
  e.preventDefault();
  setformErrors(validate(formValues));
  setIsSubmit(true);
};

const inputpassToggle = () => {
  if(inputpass === 'text') {
    return setinputpass('password')
  } 
    return setinputpass('text')
}


const validate = (Values) => {
  const errors = {};
  const regex = 
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if(!Values.username) {
    errors.username = "ユーザー名を入力してください。"
  }

  if(!Values.mailAddress) {
    errors.mailAddress = "メールアドレスを入力してください。"
  } else if (!regex.test(Values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください"
  }

  if(!Values.password) {
    errors.password = "パスワードを入力してください。"
  } else if(Values.password.length < 4) {
    errors.password = "4文字以上15文字以下のパスワードを入力してください。"
  } else if(Values.password.length > 15) {
    errors.password = "4文字以上15文字以下のパスワードを入力してください。"
  }

  return errors;
};

  return (
    <div className="formContainer">
      <form action="">
        <h1>ログインフォーム</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label htmlFor="">ユーザー名</label>
            <input type="text" placeholder='ユーザー名' name="username" onChange={(e) => handleChange(e)}/>
          </div>
          <p className='errorsMsg'>{formErrors.username}</p>
          <div className="formField">
            <label htmlFor="">メールアドレス</label>
            <input type="text" placeholder='メールアドレス' name="mailAddress" onChange={(e) => handleChange(e)}/>
          </div>
          <p className='errorsMsg'>{formErrors.mailAddress}</p>
          <div className="formField">
            <label htmlFor="">パスワード</label>
            <div className='passworsWrap'>
              <input type={inputpass} placeholder='パスワード' name="password" onChange={(e) => handleChange(e)}/>
              <p><img onClick={() => inputpassToggle()} src={Eye} alt="目のアイコン" /></p>
            </div>
          </div>
          <p className='errorsMsg'>{formErrors.password}</p>
            <button className='submitButton' onClick={(e) => handleSubmit(e)}>ログイン</button>
            {Object.keys(formErrors).length === 0 && isSubmit && (
              <div className='magOK'>ログインに成功しました</div>
            )}
        </div>
      
      </form>
    </div>
  );
}

export default App;