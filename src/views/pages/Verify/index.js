import React, { useEffect, useState } from 'react'
import apis from '../../../apis';
import { isSuccessfulRequest } from '../../../utils/apiHelper';
import { toast } from 'react-toastify';
import { handleSimpleError } from '../../../utils/errorHandlers';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';



const Verify = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [doneVerify, setDoneVerify] = useState(false)
    const [verifyStatus, setVerifyStatus] = useState("")

    const handleVerify = async () => {
        setDoneVerify(true)
        try {
            const payload = searchParams
            const { status, data } = await apis.auth.verify(payload);
            // const payload = window.location.href;
            // var splitStr = payload.substring(payload.indexOf('?') + 1);
            // const { status, data } = await apis.auth.verify(splitStr);
            if (isSuccessfulRequest(status) && data) {
                toast.success("Succesfully Verified")
                setVerifyStatus("Succesfully Verified")
            }
        } catch (error) {
            handleSimpleError(error);
            setVerifyStatus("Verify Failed Please try to register again")
        }
    }

    const handleMovePage = () => {
        navigate("/login");
    }

    useEffect(() => {
        searchParams.get("token")
        if (verifyStatus === "" && !doneVerify) {
            handleVerify();
        }
    }, [])

    return (
        <>
            Verify Page
            {verifyStatus === "Succesfully Verified" && (
                <div>
                    Succesfully Verified
                </div>
            )}
            <Button onClick={handleMovePage}>Go To Login Page</Button>
        </>
    )
}

export default Verify;