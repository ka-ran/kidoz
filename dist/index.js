var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function yearsSince(startDate, endDate) {
    const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
    return (endDate.getTime() - startDate.getTime()) / millisecondsPerYear;
}
function grantVacation(emailApi, payroll, addresses, employees) {
    return __awaiter(this, void 0, void 0, function* () {
        let emailBatchId = emailApi.createBatch();
        let addresses_map = {};
        addresses.forEach((address) => {
            address.emp_id ? (addresses_map[address.emp_id] = address) : null;
        });
        let employees_map = {};
        employees.forEach((employee) => {
            employees_map[employee.id] = employee;
        });
        for (var index in payroll) {
            let payrollInfo = payroll[index];
            let addressInfo = addresses_map[payrollInfo.emp_id];
            let empInfo = employees_map[payrollInfo.emp_id];
            let today = new Date();
            const yearsEmployed = yearsSince(empInfo.startDate, today);
            let newVacationBalance = yearsEmployed + payrollInfo.vacationDays;
            emailApi.queueEmail(emailBatchId, addressInfo.email, "Good news!", `Dear ${empInfo.name}\n` +
                `based on your ${yearsEmployed} years of employment, you have been granted ${yearsEmployed} days of vacation, bringing your total to ${newVacationBalance}`);
        }
        yield emailApi.flushBatch(emailBatchId);
    });
}
export {};
