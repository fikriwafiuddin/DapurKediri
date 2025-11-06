import { z } from "zod"

const enumPeriod = ["today", "week", "month"]

const period = z.enum(enumPeriod, "Period tidak valid").default("today")

const reportValidation = {
  period,
}
export default reportValidation
