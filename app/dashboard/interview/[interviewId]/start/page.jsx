"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';

function StartInterview({ params }) {
    const [interviewData, setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState([]);
    useEffect(() => {
         getInterviewDetails();
    },[])

    const getInterviewDetails = async () => {
        // Fetch interview details
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

          let jsonMockResp = [];
    if (result[0]?.jsonMockResp) {
        try {
            jsonMockResp = JSON.parse(result[0].jsonMockResp);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
          console.log(jsonMockResp)
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
      };
    
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}/>
        </div>
    </div>
  )
}

export default StartInterview