import { React  } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Header from "./Header";

const CopyrightComplaint = () => {

  const schema = yup.object().shape({
    itype: yup.number().required(),
    urls: yup.string().required(),
    owner: yup.string().required(),
    full_name: yup.string().required(),
    works_infringed: yup.string().required(),
    email: yup.string().required(),
    signature: yup.string().required(),
    addr_street: yup.string().required(),
    addr_city: yup.string().required(),
    job_name: yup.string().required(),
    addr_state: yup.string().required(),
    addr_zip: yup.string().required(),
    phone: yup.string().required(),
    fax: yup.string().required(),
    proclamation_1: yup.bool().required(),
    proclamation_2: yup.bool().required(),
    proclamation_3: yup.bool().required()
  }).required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/copyright_complaint", data)
      .then((res) => console.log(res))
      navigate("/home");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div id="dmca">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hotbox">
            <h2>Notification of claimed infringement
              <div>
                Please use this form to request the removal of our site links under the DMCA.
              </div>
            </h2>
          <div className="t_box"><div>
            <div className="t_field">
              <select {...register("itype")} className="required_input" >
                <option value="">Please choose one</option>
                <option value="1">Infringes on my personal copyright.</option>
                <option value="2">Infringes on the copyright of someone I am authorized to represent.</option>
              </select>
            </div>
            <div className="t_label">The following content:</div>
          </div>
        <div>
          <div className="t_field">
            <textarea {...register("works_infringed")} className="textinput textarea" tabIndex="1"></textarea>
          </div>
          <div className="t_label">Review IDs of offending content (one per line)</div>
        </div>
        <br></br>
        <div>
          <div className="t_field">
            <textarea {...register("urls")} className="textinput textarea" tabIndex="2"></textarea>
          </div>
        <div className="t_label">Copyrighted work claimed to have been infringed</div>
        </div>
      </div>
      <br></br>
        <table>
          <tbody>
            <tr>
              <td className="td_label">Copyright owner name</td>
              <td className="td_field"><input {...register("owner")} className="textinput" tabIndex="3" type="text"/></td>
              <td className="td_label2">Address</td>
              <td className="td_field2"><input {...register("addr_street")} className="textinput" tabIndex="9" type="text"/></td>
            </tr>
            <tr>
              <td className="td_label">My full name</td>
              <td className="td_field"><input {...register("full_name")} className="textinput" tabIndex="4" type="text"/></td>
              <td className="td_label2">City</td>
              <td className="td_field2"><input {...register("addr_city")} className="textinput"tabIndex="10" type="text"/></td>
              </tr>
            <tr>
              <td className="td_label">Job title</td>
              <td className="td_field"><input {...register("job_name")} className="textinput" tabIndex="5" type="text"/></td>
              <td className="td_label2">State/Province</td>
              <td className="td_field2"><input {...register("addr_state")} className="textinput" tabIndex="11" type="text"/></td>
            </tr>
            <tr>
              <td className="td_label">Email address</td>
              <td className="td_field"><input {...register("email")} className="textinput" tabIndex="6" type="email" /></td>
              <td className="td_label2">ZIP/Postal code</td>
              <td className="td_field2"><input {...register("addr_zip")} className="textinput" tabIndex="12" type="text"/></td>
            </tr>
            <tr>
              <td className="td_label">Phone</td>
              <td className="td_field"><input {...register("phone")} className="textinput" tabIndex="7" type="text"/></td>
              <td className="td_label2">Country</td>
              <td className="td_field2">
                <select name="addr_country" tabIndex="12">
                  <option value="CA">Canada</option>
                </select></td>
              </tr>
              <tr>
                <td className="td_label">Fax</td>
                <td className="td_field"><input {...register("fax")} className="textinput" tabIndex="8" type="text"/></td>
                <td className="td_label2"></td><td className="td_field2"></td>
              </tr>
            </tbody>
          </table>
          <div>
            <div >By checking the following boxes, I state UNDER PENALTY OF PERJURY of law that:</div>
            <div className="law_point">
                <div className="law_point_text">I hereby state that I have a good faith belief that the sharing of copyrighted material at the location above is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use).</div>
                <input {...register("proclamation_1")} type="checkbox" checked={true} />
            </div>
            <br/>
            <div className="law_point">
                <div className="law_point_text">I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of, the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed.</div>
                <input {...register("proclamation_2")} type="checkbox" checked={true} />
            </div>
            <br/>
            <div className="law_point">
                <div className="law_point_text">I acknowledge that under Section 512(f) any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages.</div>
                <input {...register("proclamation_3")} type="checkbox" checked={true} />
            </div>
            <br/>
            <div>
              <div>
                <div>Typing your full name in this box will act as your digital signature.</div>
                <input {...register("signature")} className="textinput" type="text"/>
              </div>
              <br/>
            </div>
          </div>
      </div>
      <div>
        <input className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3" type="submit" value="Submit"/>
      </div>
    </form>
  </div>
  </div>
  )
};

export default CopyrightComplaint;
