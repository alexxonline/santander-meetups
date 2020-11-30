export function getBeerBoxCount(
  temperature: number,
  participantsCount: number
): number {
  const relation = getRelationByPerson(temperature);
  return Math.ceil((relation * participantsCount) / 6);
}

export function getRelationByPerson(temperature: number): number {
  if (temperature < 20) {
    return 0.75;
  }
  if (temperature >= 20 && temperature <= 24) {
    return 1;
  }

  if (temperature > 24) {
    return 2;
  }
}
