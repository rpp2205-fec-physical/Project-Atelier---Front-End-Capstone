import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleX, fa-person-circle-plus } from '@fortawesome/free-solid-svg-icons';

export default function OutfitToggle(props) {
  // <FontAwesomeIcon icon="fa-solid fa-person-circle-plus" />
  // <FontAwesomeIcon icon="fa-solid fa-circle-x" />

  return <>
  <FontAwesomeIcon icon={faCircleX} />
  <FontAwesomeIcon icon="fa-solid fa-person-circle-plus" />
  </>
}