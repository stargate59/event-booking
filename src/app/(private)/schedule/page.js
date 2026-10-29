import SchedulesContainer from "@/components/containers/SchedulesContainer";
import ScheduleForm from "@/components/forms/ScheduleForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SchedulePage = async () => {
  // const schedule = await db.query.ScheduleTable.findFirst({
  //   where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
  //   with: { availabilities: true },
  // });
  const schedule = {};

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <SchedulesContainer />
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
