import { React, useState, useEffect} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { getCopyrightComplaints } from "../api";
import axios from "axios";

const Dmca = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/copyright_complaint");
  };

  const [ccItem, setCcItem] = useState([]);

  useEffect(() => {
    getCopyrightComplaints().then((data) => {
      setCcItem(data.data);
    });
  }, []);

  const [{ user }, dispatch] = useStateValue();

  const deleteCcItem = async (item) => {
    try {
      await axios.delete (`/api/copyright_complaint/${item._id}`);
      setCcItem(ccItem.filter(i => i != item));
    } catch (error) {
      console.log(error);
    }
  };

  function CcItem(props) {
    return (
      <li key={props.data._id}>
        "{props.data.works_infringed}" in "{props.data.urls}" report by {props.data.full_name}
        <button className="bg-sky-700 m-2 px-1 text-white hover:bg-sky-800" onClick={() => deleteCcItem(props.data)}>delete</button>
      </li>
    );
  }

  if(user?.user?.role === "admin") {
    return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
        <Header />
        <div className="w-full h-auto flex flex-col items-center bg-primary w-full p-4 md:py-2 md:px-6">
        <h3>
          <p className="font-semibold">For administrator</p>
        </h3>
        <div className="items-left border-solid border-2 p-8">
          <h6>
            <p>The following is a copyright request:</p>
            <ul className="list-disc m-5 p-2">
              <li>you can contact the proposer</li>
              <li>you can process the request according to the url address</li>
              <li>you can delete the request</li>
            </ul>
          </h6>
        </div>
        <ul className="p-10">
          {ccItem.map((item) => <CcItem key={item._id} data={item} />)}
        </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-full h-auto flex flex-col bg-primary w-full p-4 md:py-2 md:px-6">
        <img className="w-32 h-auto" src="https://www.thelonesgroup.com/vault/featuredimages/video-example-dmca-policy-text.jpg"></img>
        <h3>DMCA Policy</h3>
        <h6 className="md:px-6">
          Ours site respects the intellectual property rights of others and
          expects its users to do the same. In accordance with the Digital
          Millennium Copyright Act of 1998, the text of which may be found on
          the U.S. Copyright Office website at
          https://www.copyright.gov/legislation/dmca.pdf, We will respond
          expeditiously to claims of copyright infringement committed using the
          our service and/or the our website (the “Site”) if such claims are
          reported to our Designated Copyright Agent identified in the sample
          notice below. If you are a copyright owner, authorized to act on
          behalf of one, or authorized to act under any exclusive right under
          copyright, please report alleged copyright infringements taking place
          on or through the Site by completing the following DMCA Notice of
          Alleged Infringement and delivering it to our Designated Copyright
          Agent. Upon receipt of Notice as described below, we will take
          whatever action, in its sole discretion, it deems appropriate,
          including removal of the challenged content from the Site.
        </h6>
        <h3>DMCA Notice of Alleged Infringement (“Notice”)</h3>
        <ol className="list-disc list-outside md:list-inside md:px-6">
          <li>
            Identify the copyrighted work that you claim has been infringed, or
            - if multiple copyrighted works are covered by this Notice - you may
            provide a representative list of the copyrighted works that you
            claim have been infringed.
          </li>
          <li>
            Identify the material or link you claim is infringing (or the
            subject of infringing activity) and to which access is to be
            disabled, including at a minimum, if applicable, the URL of the link
            shown on the Site or the exact location where such material may be
            found.
          </li>
          <li>
            Provide your company affiliation (if applicable), mailing address,
            telephone number, and, if available, email address.
          </li>
          <li>
            Include both of the following statements in the body of the Notice:
          </li>
          <ol className="list-decimal list-outside md:list-inside md:px-6">
            <li>
              “I hereby state that I have a good faith belief that the disputed
              use of the copyrighted material is not authorised by the copyright
              owner, its agent or the law (e.g. as a fair use)”.
            </li>
            <li>
              “I hereby state that the information in this Notice is accurate
              and, under penalty of perjury, that I am the owner, or authorized
              to act on behalf of, the owner, of the copyright or of an
              exclusive right under the copyright that is allegedly infringed.”
            </li>
          </ol>
          <li>
            Provide your full legal name and your electronic or physical
            signature.
          </li>
        </ol>
        <h3>
          Deliver this Notice, with all items completed, to ours Designated
          Copyright Agent:
        </h3>
        <h6>Copyright Agent</h6>
        <h6>Not exist Inc.</h6>
        <h6>Somewhere St</h6>
        <h6>London ON</h6>
      </div>
      <button
        onClick={routeChange}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        Submit DMCA Notice
      </button>
    </div>
  );
};

export default Dmca;
