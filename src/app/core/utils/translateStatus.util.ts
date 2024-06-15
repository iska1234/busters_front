

export function translateStatus(status: string): string {
  switch (status) {
    case 'EN CAMINO':
      return 'ON THE WAY';
    case 'EN PROCESO':
      return 'IN PROGRESS';
    case 'COMPLETADA':
      return 'COMPLETED';
    default:
      return status;
  }
}
