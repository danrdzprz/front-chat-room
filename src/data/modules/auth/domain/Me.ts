import type { EmployeeDetailDomain } from "~/modules/manager/employee/domain/employee.domain";
import type { UserDomain } from "~/modules/auth/domain/user.domain";
// export interface Me {
//     "id": number;
//     "email": string;
//     "employee": EmployeeDetailDomain
// }
export type employee = Omit<EmployeeDetailDomain, "user">;

export interface Me extends UserDomain {
    employee: employee
};