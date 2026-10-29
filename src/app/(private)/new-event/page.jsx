import NewEventContainer from "@/components/containers/NewEventContainer";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewEventPAge = async () => {
  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Create a New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <NewEventContainer />
      </CardContent>
    </Card>
  );
};

export default NewEventPAge;
