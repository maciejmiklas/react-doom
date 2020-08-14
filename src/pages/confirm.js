import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import ACTIONS from "../store/actions";

export const actionShowConfirm = (callbackAction, callbackProps, headerText, msgText) => ({
    type: ACTIONS.CONFIRM_SHOW,
    callbackAction, callbackProps, headerText, msgText
})

actionShowConfirm.propTypes = {
    callbackProps: PropTypes.object,
    callbackAction: PropTypes.string,
    headerText: PropTypes.string,
    msgText: PropTypes.string
};

export const actionHideConfirm = () => ({
    type: ACTIONS.CONFIRM_HIDE
})

const actionYes = (state) => ({
    type: state.callbackAction,
    ...state.callbackProps
})

export const reducer = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.CONFIRM_SHOW:
            return {
                visible: true,
                callbackAction: action.callbackAction,
                callbackProps: action.callbackProps,
                headerText: action.headerText,
                msgText: action.msgText
            }

        case ACTIONS.CONFIRM_HIDE:
            return {
                visible: false,
                callbackAction: "-",
                callbackProps: {},
                headerText: "-",
                msgText: "-"
            }
    }
    return state;
}

const dialog = ({state, onYes, onNo}) =>
    <Modal show={state.visible} onHide={onNo}>
        <Modal.Header closeButton>
            <Modal.Title>{state.headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{state.msgText}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onNo}>
                No
            </Button>
            <Button variant="danger" onClick={() => onYes(state)} >
                Yes
            </Button>
        </Modal.Footer>
    </Modal>

export const Confirm = connect(
    state => ({state: {...state.confirm}}),
    dispatch => ({
            onYes(state) {
                dispatch(actionYes(state))
                dispatch(actionHideConfirm())
            },
            onNo() {
                dispatch(actionHideConfirm())
            }
        }
    )
)(dialog)