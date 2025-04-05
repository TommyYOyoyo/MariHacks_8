import React, { useState, useEffect } from "react";

const StudyTimer = () => {
    const studyDuration = 25 * 60; // 25 minutes
    const breakDuration = 5 * 60; // 5 minutes

    