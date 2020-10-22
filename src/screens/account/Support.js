import React from 'react';
import DefaultView from '../../components/default/DefaultView';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Support = () => {
  return (
    <DefaultView>
      <ButtonWithIcon title="Contact Us" iconName="phone" />
      <ButtonWithIcon title="Mail Us" iconName="mail" />
    </DefaultView>
  );
};

export default Support;
