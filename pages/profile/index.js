import { LinkButton } from "@/component/Button/button";
import { Fragment } from "react";

export default function Profile(){
    return (
        <Fragment>
            <LinkButton path={'/profile/auth'} text={'Login'}/>
        </Fragment>
    )
}