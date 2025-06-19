export function mapperDto<TModel, TDto>(
  model: TModel,
  dtoClass: new () => TDto
): TDto {
  const dto = new dtoClass();

  for (const key in dto) {
    if (Object.prototype.hasOwnProperty.call(model, key)) {
      (dto as any)[key] = (model as any)[key];
    }
  }

  return dto;
}

