type ShortTextType = string;

type LongTextType = string;

type SingleSelectType = string;

type MultiSelectType = string[];

type AutoNumberType = number;

type NumberType = number;

type DecimalType = number;

type BigNumberType = number;

type BooleanType = boolean;

type DateType = string;

type DateTimeType = string;

type TimeType = string;

type UrlType = string;

type PhoneNumberType = string;

type EmailType = string;

type ImageType = { data: string; url: string };

type AttachmentType = { data: string; url: string };

type FormulaType = unknown;

export namespace F {
  export namespace ShortText {
    export type Required = ShortTextType;
    export type Nullable = ShortTextType | null;
  }

  export namespace LongText {
    export type Required = LongTextType;
    export type Nullable = LongTextType | null;
  }
  export namespace SingleSelect {
    export type Required = SingleSelectType;
    export type Nullable = SingleSelectType | null;
  }

  export namespace MultiSelect {
    export type Required = MultiSelectType;
    export type Nullable = MultiSelectType | null;
  }

  export namespace AutoNumber {
    export type Required = AutoNumberType;
  }

  export namespace Number {
    export type Required = NumberType;
    export type Nullable = NumberType | null;
  }

  export namespace Decimal {
    export type Required = DecimalType;
    export type Nullable = DecimalType | null;
  }

  export namespace BigNumber {
    export type Required = BigNumberType;
    export type Nullable = BigNumberType | null;
  }

  export namespace Boolean {
    export type Required = BooleanType;
    export type Nullable = BooleanType | null;
  }

  export namespace Date {
    export type Required = DateType;
    export type Nullable = DateType | null;
  }

  export namespace DateTime {
    export type Required = DateTimeType;
    export type Nullable = DateTimeType | null;
  }

  export namespace Time {
    export type Required = TimeType;
    export type Nullable = TimeType | null;
  }

  export namespace Url {
    export type Required = UrlType;
    export type Nullable = UrlType | null;
  }

  export namespace PhoneNumber {
    export type Required = PhoneNumberType;
    export type Nullable = PhoneNumberType | null;
  }

  export namespace Email {
    export type Required = EmailType;
    export type Nullable = EmailType | null;
  }

  export namespace Image {
    export type Required = ImageType;
    export type Nullable = ImageType | null;
  }

  export namespace Attachment {
    export type Required = AttachmentType;
    export type Nullable = AttachmentType | null;
  }

  export namespace Formula {
    export type Required = FormulaType;
  }
}
