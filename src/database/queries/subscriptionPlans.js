export const getSubscriptionPlans = `
SELECT *
FROM
  SubscriptionPlans a
INNER JOIN
  SubscriptionPlanCost b
  ON a.SubscriptionPlanCostId = b.SubscriptionPlanCostId`;
